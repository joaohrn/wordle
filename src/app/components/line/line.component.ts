import {
	Component,
	EventEmitter,
	Inject,
	input,
	Input,
	OnInit,
	Output,
	signal,
} from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-line',
	standalone: true,
	imports: [CellComponent],
	templateUrl: './line.component.html',
	styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
	length = 5;
	@Input() selected = false;
	@Input() attempt = 0;
	@Input() won = false;
	@Output() wrongAnswer = new EventEmitter<boolean>();
	classSelected = 'selected';
	classEnd: string[] = [];
	word: string[] = [];
	@Output() wordOut = new EventEmitter<string[]>();
	position = 0;
	alphabet = 'abcdefghijklmnopqrstuvwxyz';
	@Input() winningWord = '';

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		this.document.addEventListener('keydown', (char) => {
			if (this.selected) {
				if (this.alphabet.includes(char.key)) this.changeChar(char);
				if (char.key == 'Backspace') this.erase();
				if (char.key == 'Enter' && this.word.length == 5 && !this.won) {
					this.colorChange();
					this.submitWin();
				}
				this.wordOut.emit(this.word);
			}
		});
	}
	public changeChar(char: KeyboardEvent): void {
		if (this.word.length < this.length) {
			if (this.alphabet.includes(char.key)) {
				this.word.push(char.key);
			}
		}
		if (this.position < this.length - 1) this.position += 1;
		if (
			this.position == this.length - 1 &&
			this.word.length == this.length
		) {
			if (this.alphabet.includes(char.key))
				this.word[this.length - 1] = char.key;
		}
	}
	public erase() {
		if (this.position < 0) return;
		if (this.position == 0 || this.position == this.word.length - 1) {
			this.word.splice(this.position, 1);
		} else if (this.position > 0) this.word.splice(this.position - 1, 1);
		if (this.position > 0 && this.word.length < this.position)
			this.position -= 1;
	}
	public submitWin() {
		if (this.word.join('') == this.winningWord) {
			alert('You win');
			this.won = true;
		} else {
			this.attempt += 1;
			this.wrongAnswer.emit(true);
		}
	}
	public colorChange() {
		let tempArray = this.winningWord.split('').slice();
		for (let i = 0; i <= 4; i++) {
			if (this.word[i] === tempArray[i]) {
				tempArray[i] = '';
				this.classEnd.push('correct-position');
			} else if (
				tempArray.includes(this.word[i]) &&
				tempArray[i] !== this.word[i]
			) {
				tempArray[i] = '';
				this.classEnd.push('correct-letter');
			} else {
				tempArray[i] = '';
				this.classEnd.push('');
			}
		}
	}
}
