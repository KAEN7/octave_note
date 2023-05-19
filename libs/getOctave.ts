// audioUtils.js 파일에서 함수를 가져옵니다.
import { getNote, volumeAudioProcess } from "./music-fns";

const getOctave = () => {
	// 오디오 컨텍스트 및 노드 생성
	const audioContext = new AudioContext();
	const processorNode = audioContext.createScriptProcessor(2048, 1, 1);

	// 사용자의 마이크에 액세스하기 위해 getUserMedia를 호출합니다.
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				// 입력 노드 및 분석기 노드 생성
				const sourceNode = audioContext.createMediaStreamSource(stream);
				const analyzerNode = audioContext.createAnalyser();
				analyzerNode.fftSize = 2048;

				// 노드를 연결하고 오디오를 설정합니다.
				sourceNode.connect(analyzerNode);
				analyzerNode.connect(processorNode);
				processorNode.connect(audioContext.destination);

				// Audio 버퍼 및 주파수 데이터 배열 생성
				const bufferLength = analyzerNode.frequencyBinCount;
				const dataArray = new Uint8Array(bufferLength);

				// 주파수와 인덱스를 찾는 함수
				function findFrequencyAndIndex(sourceData) {
					function autoCorrelate(buf, sampleRate) {
						const SIZE = buf.length;
						const MAX_SAMPLES = Math.floor(SIZE / 2);
						let best_offset = -1;
						let best_correlation = 0;
						let rms = 0;
						let found_good_correlation = false;

						for (let i = 0; i < SIZE; i++) {
							const val = buf[i] / 255 - 0.5; // 오디오 데이터를 정규화
							rms += val * val;
						}
						rms = Math.sqrt(rms / SIZE);

						if (rms < 0.01) return -1;

						for (let offset = 4; offset < MAX_SAMPLES; offset++) {
							let correlation = 0;

							for (let i = 0; i < MAX_SAMPLES; i++) {
								correlation += Math.abs(
									buf[i] / 255 - 0.5 - (buf[i + offset] / 255 - 0.5)
								);
							}
							correlation = 1 - correlation / MAX_SAMPLES;
							if (correlation > 0.94 && correlation > best_correlation) {
								best_correlation = correlation;
								best_offset = offset;
								found_good_correlation = true;
							} else if (found_good_correlation && correlation < 0.94) {
								return sampleRate / best_offset;
							}
						}
						return -1;
					}

					const frequency = autoCorrelate(sourceData, audioContext.sampleRate);

					if (frequency !== -1) {
						const index = Math.round(
							(frequency * bufferLength) / audioContext.sampleRate
						);
						return { frequency, index };
					}

					return { frequency: -1, index: -1 };
				}

				// 프로세서 노드의 onaudioprocess 이벤트 설정
				processorNode.onaudioprocess = () => {
					analyzerNode.getByteFrequencyData(dataArray);

					// 가장 큰 주파수 값을 찾습니다.
					const { frequency, index } = findFrequencyAndIndex(dataArray);

					// 주파수의 음계 정보를 가져옵니다.
					const note = getNote(frequency);
					console.log("Note:", note);

					// 오디오 볼륨 레벨을 가져옵니다.
					// const volume = volumeAudioProcess(dataArray);
					// console.log("Volume (RMS):", volume);
				};
			})
			.catch((error) => {
				console.error("Error accessing user media:", error);
			});
	} else {
		console.error("Browser does not support getUserMedia");
	}
};

export default getOctave;
