import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellComponent } from './components/cell/cell.component';
import { LineComponent } from './components/line/line.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, LineComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	winningWord = 'lutem';
	selected = 0;
	word!: string[];

	public submitWin() {
		console.log(this.word);
		if (this.word.join('') == this.winningWord) {
			alert('You win');
		} else {
			if (this.selected < 5) this.selected += 1;
		}
	}
	public getWord(event: string[]) {
		this.word = event;
	}
}
