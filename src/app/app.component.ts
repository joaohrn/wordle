import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellComponent } from './components/cell/cell.component';
import { LineComponent } from './components/line/line.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [LineComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	winningWord = 'lutem';
	attemptNumber = signal(0);
	word!: string[];
	public getWord(event: string[]) {
		this.word = event;
	}
	getAttemptNum(event: boolean) {
		this.attemptNumber.set(
			event ? this.attemptNumber() + 1 : this.attemptNumber()
		);
	}
}
