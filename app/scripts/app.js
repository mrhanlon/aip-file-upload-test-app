(function(window, $, undefined) {
  'use strict';

  console.log('Hello, file upload test app!');

  var appContext = $('[data-app-name="file-upload-test-app"]');

  /* Generate Agave API docs */
  window.addEventListener('Agave::ready', function() {
    var Agave, help, helpItem, helpDetail, methods, methodDetail;

    Agave = window.Agave;

    $('form[name="input-file-upload-form"]').on('submit', function(e) {
      e.preventDefault();

      var file = $('#fileToUpload');
      var data = new FormData(file[0]);
      Agave.api.files.importToDefaultSystem(
        {sourcefilePath:'mrhanlon', fileToUpload: file[0].files[0]},
        {requestContentType: 'multipart/form-data'},
        function(resp) {
          $('.input-file-response pre').text(JSON.stringify(resp, null, 2));
          $('.input-file-response').removeClass('hide');
        }
      );
    });


    $('form[name="blob-upload-form"]').on('submit', function(e) {
      e.preventDefault();
      var fileName = this[0].value;
      var fileData = this[1].value;
      Agave.api.files.importToDefaultSystem(
        {sourcefilePath:'mrhanlon', fileToUpload: new Blob([fileData], {type: 'text/plain'}), fileName: fileName},
        {requestContentType: 'multipart/form-data'},
        function(resp) {
          $('.blob-response pre').text(JSON.stringify(resp, null, 2));
          $('.blob-response').removeClass('hide');
        }
      );
    });
  });

})(window, jQuery);
