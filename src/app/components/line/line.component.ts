import { Component, HostListener, inject, input, output } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { FunctionService } from '../../services/function.service';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
@Component({
	selector: 'app-line',
	standalone: true,
	imports: [CellComponent],
	templateUrl: './line.component.html',
	styleUrls: ['./line.component.scss'],
})
export class LineComponent {
	service = inject(FunctionService);
	winningWord = input('');
	won = input(false);
	selected = input(false);
	wordOut = output<string[]>();
	rightAnswer = output<boolean>();
	length: number = 5;
	position: number = 0;
	word: string[] = Array(this.length).fill('');
	colorResult: string[] = Array(this.length).fill('');

	@HostListener('window:keydown', ['$event'])
	readKey(char: KeyboardEvent) {
		if (this.selected()) {
			if (alphabet.includes(char.key.toLowerCase()) && !this.won())
				this.position = this.service.changeChar(
					char,
					this.word,
					this.length,
					this.position
				);
			if (char.key == 'Backspace')
				this.position = this.service.erase(this.word, this.position);
			if (char.key == 'ArrowLeft')
				this.position = this.service.move(
					'left',
					this.position,
					this.length
				);
			if (char.key == 'ArrowRight')
				this.position = this.service.move(
					'right',
					this.position,
					this.length
				);
			if (char.key == 'Enter' && !this.word.includes('') && !this.won()) {
				this.colorResult = this.service.colorChange(
					this.word,
					this.winningWord().split('').slice(),
					this.length
				);
				this.rightAnswer.emit(
					this.service.submitWin(
						this.word.join(''),
						this.winningWord()
					)
				);
			}
			this.wordOut.emit(this.word);
		}
	}
}
