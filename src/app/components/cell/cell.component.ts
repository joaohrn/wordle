import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-cell',
	standalone: true,
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
	@Input() character = ' ';

	constructor() {}

	ngOnInit() {}
}
