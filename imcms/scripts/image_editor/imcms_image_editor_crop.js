(function ( Imcms ) {
  Imcms.ImageEditorCrop = {
    init: function () {
      $( "#cropArea" ).mouseover( Imcms.ImageEditorCrop.moveCropArea );
      $( "#angleTopLeft" ).mousedown( Imcms.ImageEditorCrop.resizeTopLeft );
      $( "#angleTopRight" ).mousedown( Imcms.ImageEditorCrop.resizeTopRight );
      $( "#angleBottomLeft" ).mousedown( Imcms.ImageEditorCrop.resizeBottomLeft );
      $( "#angleBottomRight" ).mousedown( Imcms.ImageEditorCrop.resizeBottomRight );

    },
    moveCropArea: function () {
      var cropArea     = $( "#cropArea" ),
          positionTop  = cropArea.css( "top" ),
          positionLeft = cropArea.css( "left" )
      ;

      cropArea.draggable( {
                            containment: "parent",
                            drag: function () {
                              positionTop = cropArea.css( "top" );
                              positionLeft = cropArea.css( "left" );
                              cropArea.css( {
                                              "background-position-x": "-" + positionLeft,
                                              "background-position-y": "-" + positionTop
                                            } );
                            }
                          } );
    }
  };

  return Imcms.ImageEditorCrop;
})( Imcms );