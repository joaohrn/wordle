import {
	Component,
	EventEmitter,
	Inject,
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
	classSelected = 'selected';
	word: string[] = [];
	@Output() emitter = new EventEmitter<string[]>();
	position = 0;
	alphabet = 'abcdefghijklmnopqrstuvwxyz';
	@Input() winningWord = '';

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		this.document.addEventListener('keyup', (char) => {
			if (this.selected) {
				if (this.alphabet.includes(char.key)) this.changeChar(char);
				if (char.key == 'Backspace') this.erase();
				if (char.key == 'Enter') this.submitWin();
				this.emitter.emit(this.word);
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
		console.log(this.word.join(''));
		console.log(this.position);
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
		console.log(this.word);
		if (this.word.join('') == this.winningWord) {
			alert('You win');
		}
	}
}
