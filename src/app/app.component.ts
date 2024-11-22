import { Component, signal } from '@angular/core';
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
	hasWon = false;
	public getWord(event: string[]) {
		this.word = event;
	}
	public registerAttempt(event: boolean) {
		if (event) {
			this.hasWon = true;
		} else {
			this.attemptNumber.set(this.attemptNumber() + 1);
		}
	}
}
