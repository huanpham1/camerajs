const video = document.getElementById('video')
console.log('b')
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('/static/js/models'),
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
      {video: {}},
      stream => video.srcObject = stream,
      err => console.error(err)
  )
}

video.addEventListener('play', () => {
  setInterval(async () => {
    
      const canvas = faceapi.createCanvasFromMedia(video)
      document.body.append(canvas);
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)
      const detections = await faceapi.detectSingleFace(video)
      //extract face
      extractFaceFromBox(video, detections.box)
      // console.log(detections)
      // const resizedDetections = faceapi.resizeResults(detections, displaySize)
      //draw
      // const resizedDetections = faceapi.resizeResults(detections, displaySize)

      // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      // faceapi.draw.drawDetections(canvas, resizedDetections)
  }, 5000)
})

let outputImage = document.getElementById('outputImage')

// This function extract a face from video frame with giving bounding box and display result into outputimage
async function extractFaceFromBox(inputImage, box){ 
  const regionsToExtract = [
      new faceapi.Rect( box.x, box.y , box.width , box.height)
  ]
                      
  let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract)

  if(faceImages.length == 0){
      console.log('Face not found')
  }
  else
  {    
      faceImages.forEach(cnv =>{
          outputImage.src = cnv.toDataURL();
          myfunc(cnv)
      })
  }   
}                       
              
             



// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/static/js/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/static/js/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/static/js/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/static/js/models')
// ]).then(startVideo)

// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)

//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectSingleFace(
//       video,
//       new faceapi.TinyFaceDetectorOptions()
//     );
//   const regionsToExtract = [
//     new faceapi.Rect(detections.box._x, detections.box._y, detections.box._width, detections.box._height)
//   ];
//   let faceImages = await faceapi.extractFaces(video, regionsToExtract);

//     console.log(faceImages)
//     }, 100)
// })
// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     faceapi.draw.drawDetections(canvas, resizedDetections)
//     // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })


//onclick idea

// const btn = document.getElementById('btn')
// btn.onclick = ()=>{
//   let canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);
//   const displaySize = {width: video.width, height: video.height};
//   faceapi.matchDimensions(canvas, displaySize);
//   //Call this function to extract and display face
//   canvas = faceapi.createCanvasFromMedia(video)
//   // const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   const detections =  faceapi.detectSingleFace(video)
//   // console.log(displaySize)
//   // const resizedDetections = faceapi.resizeResults(detections, displaySize)
//   console.log(detections)
//   // extractFaceFromBox(video, detections.box)
//   //draw
//   // const resizedDetections = faceapi.resizeResults(detections, displaySize)

//   // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//   // faceapi.draw.drawDetections(canvas, resizedDetections)
// }