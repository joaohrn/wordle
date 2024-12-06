import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FunctionService {
	constructor() {}
	public changeChar(
		char: KeyboardEvent,
		word: string[],
		length: number,
		position: number
	): number {
		word[position] = char.key.toLowerCase();
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
			return true;
		} else {
			return false;
		}
	}

	public colorChange(
		word: string[],
		winningWord: string[],
		length: number
	): string[] {
		let color: string[] = new Array(5).fill('');
		for (let i = 0; i <= length - 1; i++) {
			if (word[i] === winningWord[i]) {
				winningWord[i] = '';
				color[i] = 'correct-position';
			}
		}
		for (let i = 0; i <= length - 1; i++) {
			if (winningWord.includes(word[i]) && winningWord[i] !== word[i]) {
				color[i] = 'correct-letter';
				winningWord[winningWord.findIndex((e) => e === word[i])] = '';
			}
		}
		return color;
	}
}
