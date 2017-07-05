(function ( Imcms ) {
  Imcms.ImageEditorBottomPanel = {
    init: function () {
      $( "#editImageZoomPlusBtn" ).click( Imcms.ImageEditorBottomPanel.zoomPlus );
      $( "#editImageZoomMinusBtn" ).click( Imcms.ImageEditorBottomPanel.zoomMinus );
      $( "#editImageZoomContainBtn" ).click( Imcms.ImageEditorBottomPanel.zoomContain );
      $( "#editImageRotateLeftBtn" ).click( Imcms.ImageEditorBottomPanel.rotateLeft );
      $( "#editImageRotateRightBtn" ).click( Imcms.ImageEditorBottomPanel.rotateRight );
    },
    zoomPlus: function () {
      var editableImage       = $( "#editableImage" ),
          imageAreaLayout     = $( "#imageAreaLayout" ),
          cropArea            = $( "#cropArea" ),
          editableImageOption = {},
          newHeight,
          newWidth,
          backgroundSizeVal
      ;

      editableImageOption.height = editableImage.height();
      editableImageOption.width = editableImage.width();

      newHeight = editableImageOption.height + 50;
      newWidth = editableImageOption.width + 50;

      backgroundSizeVal = newWidth + "px " + newHeight + "px";

      editableImage.animate( {
                               "width": newWidth + "px",
                               "height": newHeight + "px"
                             }, 200 );
      editableImage.css( { "background-size": backgroundSizeVal } );

      imageAreaLayout.animate( {
                                 "width": newWidth + "px",
                                 "height": newHeight + "px"
                               }, 200 );
      cropArea.css( { "background-size": backgroundSizeVal } );
    },
    zoomMinus: function () {
      var editableImage       = $( "#editableImage" ),
          imageAreaLayout     = $( "#imageAreaLayout" ),
          cropArea            = $( "#cropArea" ),
          editableImageOption = {},
          newHeight,
          newWidth,
          backgroundSizeVal
      ;

      editableImageOption.height = editableImage.height();
      editableImageOption.width = editableImage.width();

      newHeight = editableImageOption.height - 50;
      newWidth = editableImageOption.width - 50;

      backgroundSizeVal = newWidth + "px " + newHeight + "px";

      editableImage.animate( {
                               "width": newWidth + "px",
                               "height": newHeight + "px"
                             }, 200 );
      editableImage.css( { "background-size": backgroundSizeVal } );

      imageAreaLayout.animate( {
                                 "width": newWidth + "px",
                                 "height": newHeight + "px"
                               }, 200 );
      cropArea.css( { "background-size": backgroundSizeVal } );
    },
    zoomContain: function () {
      var imageArea           = $( "#imageArea" ),
          editableImage       = $( "#editableImage" ),
          imageAreaLayout     = $( "#imageAreaLayout" ),
          cropArea            = $( "#cropArea" ),
          editableImageOption = {},
          imageAreaOption     = {},
          newHeight,
          newWidth,
          backgroundSizeVal
      ;

      editableImageOption.height = editableImage.height();
      editableImageOption.width = editableImage.width();

      imageAreaOption.height = imageArea.height();
      imageAreaOption.width = imageArea.width();

      newHeight = imageAreaOption.height;
      newWidth = imageAreaOption.width;

      backgroundSizeVal = newWidth + "px " + "auto";

      editableImage.animate( {
                               "width": newWidth + "px",
                               "height": newHeight + "px"
                             }, 200 );
      editableImage.css( { "background-size": backgroundSizeVal } );

      imageAreaLayout.animate( {
                                 "width": newWidth + "px",
                                 "height": newHeight + "px"
                               }, 200 );
      cropArea.css( { "background-size": backgroundSizeVal } );

    }
  };

  return Imcms.ImageEditorBottomPanel;
})( Imcms );