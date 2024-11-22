import { Component, Inject, input, OnInit, output } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { DOCUMENT } from '@angular/common';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
@Component({
	selector: 'app-line',
	standalone: true,
	imports: [CellComponent],
	templateUrl: './line.component.html',
	styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
	winningWord = input('');
	won = input(false);
	selected = input(false);
	wordOut = output<string[]>();
	rightAnswer = output<boolean>();
	length: number = 5;
	position: number = 0;
	word: string[] = Array(this.length).fill('');
	colorResult: string[] = Array(this.length).fill('');

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		this.document.addEventListener('keydown', (char) => {
			if (this.selected()) {
				if (alphabet.includes(char.key) && !this.won())
					this.position = this.changeChar(
						char,
						this.word,
						this.length,
						this.position
					);
				if (char.key == 'Backspace')
					this.position = this.erase(this.word, this.position);
				if (char.key == 'ArrowLeft')
					this.position = this.move(
						'left',
						this.position,
						this.length
					);
				if (char.key == 'ArrowRight')
					this.position = this.move(
						'right',
						this.position,
						this.length
					);
				if (
					char.key == 'Enter' &&
					!this.word.includes('') &&
					!this.won()
				) {
					this.colorChange(
						this.word,
						this.winningWord().split('').slice(),
						this.length
					);
					this.submitWin(this.word.join(''), this.winningWord());
				}
				this.wordOut.emit(this.word);
			}
		});
	}
	public changeChar(
		char: KeyboardEvent,
		word: string[],
		length: number,
		position: number
	): number {
		word[position] = char.key;
		if (position < length - 1) position += 1;
		return position;
	}
	public erase(word: string[], position: number): number {
		if (word[position] === '') {
			word[position - 1] = '';
			if (position > 0) position -= 1;
		} else {
			word[position] = '';
		}
		return position;
	}
	public move(
		direction: 'left' | 'right',
		position: number,
		length: number
	): number {
		if (direction === 'left' && position > 0) position -= 1;
		if (direction === 'right' && position < length - 1) position += 1;
		return position;
	}
	public submitWin(word: string, winningWord: string) {
		if (word == winningWord) {
			alert('You win');
			this.rightAnswer.emit(true);
		} else {
			this.rightAnswer.emit(false);
		}
	}
	public colorChange(word: string[], winningWord: string[], length: number) {
		for (let i = 0; i <= length - 1; i++) {
			if (word[i] === winningWord[i]) {
				winningWord[i] = '';
				this.colorResult[i] = 'correct-position';
			}
		}
		for (let i = 0; i <= length - 1; i++) {
			if (winningWord.includes(word[i]) && winningWord[i] !== word[i]) {
				this.colorResult[i] = 'correct-letter';
				winningWord[winningWord.findIndex((e) => e === word[i])] = '';
			}
		}
	}
}
