import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { AppStore } from '../../../models/appstore.model';
import { AudioStream } from '../../../audio-element';

@Component({
  selector: 'visualizer-2D-frequency',
  styleUrls: [ '../audio-controls.component.css' ],
  templateUrl: './frequency-visualizer.component.html'
})
export class FrequencyVisualizerComponent {
  frequencyDataArray: any;
  frequencyBufferLength: number;
  frequencyCanvas: any;
  frequencyCanvasCtx: any;
  WIDTH: number;
  HEIGHT: number;
  drawFrequencyVisual: any;
  barWidth: number;
  barHeight: number;
  x: number;
  hasfrequencyCanvas: boolean;
  audioCtx: any;
  audioSrcNode: any;
  renderFreqInterval: number;

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) { }

  ngOnInit() {
    this.frequencyBufferLength = this.audioSrc.frequencyBufferLength;
    this.hasfrequencyCanvas = false;

    this.frequencyCanvas = document.getElementById('visualizerFrequencyCanvas');
    this.frequencyCanvasCtx = this.frequencyCanvas.getContext('2d');
    this.WIDTH = this.frequencyCanvas.width;
    this.HEIGHT = this.frequencyCanvas.height;
    this.frequencyCanvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    this.hasfrequencyCanvas = true;

    this.frequencyDataArray = new Uint8Array(this.audioSrc.frequencyAnalyser.frequencyBinCount);
    let that = this;
    this.renderFreqInterval = window.setInterval(function() {
      // that.frequencyDataArray = that.audioSrc.frequencyDataArray;
      that.drawFrequencyBars(that);
    }, 50);
  }

  ngOnDestroy() {
    clearInterval(this.renderFreqInterval);
  }

  drawFrequencyBars(context) {
    if (context.hasfrequencyCanvas) {

      context.audioSrc.frequencyAnalyser.getByteFrequencyData(context.frequencyDataArray);

      context.drawFrequencyVisual = requestAnimationFrame(context.drawFrequencyBars);

      let gradient = context.frequencyCanvasCtx.createLinearGradient(0, 0, 0, context.HEIGHT);
      gradient.addColorStop(0, '#252525');
      gradient.addColorStop(0.2, '#2E2E2E');
      gradient.addColorStop(0.8, '#2E2E2E');
      gradient.addColorStop(1, '#252525');
      context.frequencyCanvasCtx.fillStyle = gradient;
      context.frequencyCanvasCtx.fillRect(0, 0, context.WIDTH, context.HEIGHT);

      context.barWidth = (context.WIDTH / context.frequencyBufferLength) * 2.5;
      context.barHeight;
      context.x = 0;

      for (let i = 0; i < context.frequencyBufferLength; i++) {
        context.barHeight = context.frequencyDataArray[i];
        context.frequencyCanvasCtx.fillStyle = 'rgb(' + (context.barHeight + 0) + ',' + (context.barHeight + 0) + ',' + (context.barHeight + 0) + ')';
        context.frequencyCanvasCtx.fillRect(context.x, context.HEIGHT - context.barHeight / 2, context.barWidth, context.barHeight / 2);
        context.x += context.barWidth + 1;
      }
    }
  };
}
