import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
      apiKey: "AIzaSyAnxR0khiEU_pTYojc1f_9AlmEnE9sg5D4",
      authDomain: "fir-prj-51e7b.firebaseapp.com",
      projectId: "fir-prj-51e7b",
      storageBucket: "fir-prj-51e7b.appspot.com",
      messagingSenderId: "646723771777",
      appId: "1:646723771777:web:d126b73ea1614e393e1c80",
      measurementId: "G-5WQ25ZNRK2"
      };
        
      
      const app = initializeApp(firebaseConfig)
      
      function myfunc(c){
        c.toBlob(function(blob){
          const metaData = {
            contentType: blob.type
          }
        const storage = getStorage(app);
        const storageRef = ref(storage, "Images/"+"facenew.png")
            const uploadTask = uploadBytesResumable(storageRef, blob,metaData)
            uploadTask.on('state_changed', 
            (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
              console.log('Upload is paused');
              break;
              case 'running':
              console.log('Upload is running');
              break;
            }
            }, 
            (error) => {
            // Handle unsuccessful uploads
            }, 
            () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
            });
            }
          );
        })
      }
      // Initialize Firebase
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
            const regionsToExtract = [
                new faceapi.Rect( detections.box.x, detections.box.y , detections.box.width , detections.box.height)
            ]
                                
            let faceImages = await faceapi.extractFaces(video, regionsToExtract)
            if(faceImages.length == 0){
                console.log('Face not found')
            }
            else
            {    
                faceImages.forEach(cnv =>{
                    // outputImage.src = cnv.toDataURL();
                    myfunc(cnv)
                })
            }
            // extractFaceFromBox(video, detections.box)
        }, 10000)
      })
      
    //   let outputImage = document.getElementById('outputImage')
      
      // This function extract a face from video frame with giving bounding box and display result into outputimage
    //   async function extractFaceFromBox(inputImage, box){ 
    //     const regionsToExtract = [
    //         new faceapi.Rect( box.x, box.y , box.width , box.height)
    //     ]
                            
    //     let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract)
      
    //     if(faceImages.length == 0){
    //         console.log('Face not found')
    //     }
    //     else
    //     {    
    //         faceImages.forEach(cnv =>{
    //             // outputImage.src = cnv.toDataURL();
    //             myfunc(cnv)
    //         })
    //     }   
    //   }