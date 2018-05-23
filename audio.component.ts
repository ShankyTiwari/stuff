import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

	constructor() { }

	@Input() title: string;
	@Input() src: string;

	isPlaying = false;
	canPlay = false;

	progressBarValue = 0;
	sliderUpdateInterval = null;
	audio: HTMLAudioElement = null;

	ngOnInit() {
		this.createAudio().then( () => {
			this.canPlay = true;
			this.audio.onended = () => {
				if (this.sliderUpdateInterval || this.progressBarValue === 100 || this.progressBarValue > 100) {
					this.isPlaying = false;
					clearInterval(this.sliderUpdateInterval);
				}
			};
		});
	}

	playAudio() {
		if (!this.canPlay) {
			return;
		}
		this.isPlaying = true;
		this.audio.play();
		this.updateProgressBar();
	}

	pauseAudio() {
		this.audio.pause();
		this.isPlaying = false;
	}

	updateProgressBar() {
		if (this.sliderUpdateInterval || this.progressBarValue === 100 || this.progressBarValue >  100) {
			clearInterval(this.sliderUpdateInterval);
		}
		this.sliderUpdateInterval = setInterval( () => {
			if (this.isPlaying) {
				this.setProgressbarValue();
			} else {
				clearInterval(this.sliderUpdateInterval);
			}
		}, 60);
	}

	setProgressbarValue(progressBarValue: number): void {
		this.progressBarValue = (this.audio.currentTime / this.audio.duration) * 100;
	}

	convertSecToMin() {
		const seconds = this.audio.duration - this.audio.currentTime;
		if (seconds === 0) {
			return '0:00';
		}
		const minutes = Math.floor(seconds / 60);
		const secondsToCalc = Math.floor(seconds % 60) + '';
		return minutes + ':' + (secondsToCalc.length < 2 ? '0' + secondsToCalc : secondsToCalc);
	}

	createAudio() {
		return new Promise( (resolve, reject) => {
			this.audio = document.createElement('audio');
			this.audio.id = 'audio-player';
			this.audio.controls = true;
			this.audio.src = this.src;
			this.audio.load();
			this.audio.oncanplay = () => {
				setTimeout( () => {
					resolve();
				},1000);
			};
		});
	}

	seek(event){
		const x = event.x - event.currentTarget.getBoundingClientRect().left;
		const r = (x / event.currentTarget.getBoundingClientRect().width) * this.audio.duration;
		this.audio.currentTime = r;
		this.setProgressbarValue();
	}
	
	/*
	import {Validators} from '@angular/forms';

	export class AddressLineValidation {
			constructor() {
				return [
					'',
					Validators.compose(
						[
							Validators.pattern(/[\w\s]+/),
							Validators.required,
						],
					),
				];
			}
		}
		
		import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-multilevel-list',
	templateUrl: './multilevel-list.component.html',
	styleUrls: ['./multilevel-list.component.scss'],
	animations: [
		trigger('divState', [
			state('in', style({ backgroundColor: 'red', transform: 'translateX(0)' })),

			transition('void => *', [
				animate(1000, keyframes([
					style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
					style({ backgroundColor: '#bee0ff', opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
					style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
				]))
			]),
			transition('* => void', [
				animate(300, keyframes([
					style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
					style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
					style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
				]))
			])
		]),
		trigger('isExpanded', [
			state('no', style({ transform: 'rotate(0deg)' })),
			state('yes', style({ transform: 'rotate(-90deg)' })),

			transition('no => yes',
				animate(300)
			),
			transition('yes => no',
				animate(300)
			)
		])
	]
})
export class MultilevelListComponent implements OnInit {
	updatedList = [];
	@Input() list: any;
	@Output() selectedItem = new EventEmitter<any>();
	ngOnInit() {
		if (this.list !== undefined && this.list !== null && this.list !== '' ) {
			this.list.forEach((item) => {
				item['expanded'] = false;
				this.updatedList.push(item);
			});
		}
	}

	expand(item) {
		item.expanded = !item.expanded;
		if (item.submenu.length === 0) {
			delete item.expanded;
			this.selectedItem.emit(item);
		}
	}
}


	*/

}
