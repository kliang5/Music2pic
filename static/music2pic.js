$('#chooseFile').bind('change', function () {
    console.log('hi2')
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
      $("#image-upload").removeClass('active');
      $("#noFile").text("No file chosen..."); 
    }
    else {
      $("#image-upload").addClass('active');
      $("#noFile").text(filename); 
    }
});


$('#chooseFile2').bind('change', function () {
    console.log('hi')
    var filename2 = $("#chooseFile2").val();
    if (/^\s*$/.test(filename2)) {
      $("#music-upload").removeClass('active');
      $("#noFile2").text("No file chosen..."); 
    }
    else {
      $("#music-upload").addClass('active');
      $("#noFile2").text(filename2); 
    }
});

// button = document.querySelector "button"
// parent = button.parentElement

// button.addEventListener "click", ->
//   parent.classList.add "clicked"
//   setTimeout ( -> parent.classList.add "success"), 2600
  
// balapaCop "Upload Progress Interaction", "#999"

function handleUpload(e) {
    e.preventDefault();

    const formData  = new FormData();
    const imageInput = document.getElementById('chooseFile');
    formData.append('upload-image', imageInput.files[0]);
    const musicInput = document.getElementById('chooseFile2');
    formData.append('upload-music', musicInput.files[0]);

    

    fetch('/add', {
        method: 'POST',
        body: formData
    })
    .then(r => r.json())
    .then(data => {
        console.log(data);
        const imgElement = document.getElementById('result-image');
        imgElement.src = data['image_url'];
        const previewImgElement = document.getElementById('image-input');
        previewImgElement.src = data['preview_url'];
    });
}

document.getElementById('upload-form').onsubmit = handleUpload;
$('#submit-button').click(handleUpload);
