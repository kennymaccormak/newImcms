(function ( Imcms ) {
  Imcms.ImageEditorCrop = {
    init: function () {
      $( "#cropArea" ).mouseover( Imcms.ImageEditorCrop.cropImg );
    },
    cropImg: function () {
      var cropArea     = $( "#cropArea" ),
          positionTop  = cropArea.css( "top" ),
          positionLeft = cropArea.css( "left" )
      ;

      $( ".ui-icon-gripsmall-diagonal-se" ).css( {
                                                   "bottom": "-5px",
                                                   "right": "-5px",
                                                   "opacity": 0
                                                 } );

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

      cropArea.resizable( {
                            handles: "all",
                            resize: function ( event, ui ) {
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