document.getElementById('myForm').addEventListener('submit', savePhoto);

function savePhoto(e){
  var photoCaption = document.getElementById('photoCaption').value;
  var photoUrl = document.getElementById('photoUrl').value;

  if(!validateForm(photoCaption, photoUrl)){
    return false;
  }

  var photo = {
    caption: photoCaption,
    url: photoUrl
  }


  /*localStorage.setItem('photo', JSON.stringify(photo));
  var photos = localStorage.getItem('photo');
  console.log(JSON.parse(photos));
*/
  if(localStorage.getItem('photos') === null){
    var photos = [];
    photos.push(photo);
    localStorage.setItem('photos', JSON.stringify(photos));
  } else {
    var photos = JSON.parse(localStorage.getItem('photos'));
    photos.push(photo);
    localStorage.setItem('photos', JSON.stringify(photos));
  }
  document.getElementById('myForm').reset();

  fetchPhotos();

  e.preventDefault();
}

function deletePhoto(url){
  var photos = JSON.parse(localStorage.getItem('photos'));

  for(var i = 0; i <photos.length; i++){
    if(photos[i].url === url){
      photos.splice(i, 1);
    }
  }
  localStorage.setItem('photos', JSON.stringify(photos));

  fetchPhotos();
}

function fetchPhotos(){
  var photos = JSON.parse(localStorage.getItem('photos'));

  var photosResults = document.getElementById('photosResults');

  photosResults.innerHTML = ""
  for(var i= 0; i < photos.length; i++){
    var caption = photos[i].caption;
    var url = photos[i].url;

    photosResults.innerHTML += '<div class="card well">'+
                                '<img class="thumbnail" height="200" src="'+url+'">'+
                                '<h5><strong>Caption:</strong> '+caption+
                                '</h5>'+
                                ' <a onclick="deletePhoto(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                '</div>';
  }
}

function validateForm(photoCaption, photoUrl){
  if(!photoCaption || !photoUrl){
    alert('Please fill in the form!');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!photoUrl.match(regex)){
    alert('Please use a valid URL!')
    return false;
  }
  return true;
}
