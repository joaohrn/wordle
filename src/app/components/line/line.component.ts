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
	classes = ['selected', '', '', '', ''];
	word: string[] = [];
	@Output() emitter = new EventEmitter<string[]>();
	position = 0;
	alphabet = 'abcdefghijklmnopqrstuvwxyz';

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		this.document.addEventListener('keydown', (char) => {
			if (this.selected) {
				this.changeChar(char);
				this.emitter.emit(this.word);
			}
		});
	}
	public changeChar(char: KeyboardEvent): void {
		if (this.position < this.length) {
			if (this.alphabet.includes(char.key)) {
				this.word.push(char.key);
				this.position += 1;
				this.classes.fill('selected', this.position, this.position + 1);
				this.classes.fill('', this.position - 1, this.position);
			}
		}
		if (this.position == this.length) {
			if (this.alphabet.includes(char.key))
				this.word[this.length - 1] = char.key;
			this.classes[this.length - 1] = 'selected';
		}
		console.log(this.word.join(''));
	}
}
