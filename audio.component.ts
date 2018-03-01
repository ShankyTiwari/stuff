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
				this.progressBarValue = (this.audio.currentTime / this.audio.duration) * 100;
			} else {
				clearInterval(this.sliderUpdateInterval);
			}
		}, 60);
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
				resolve();
			};
		});
	}

}
