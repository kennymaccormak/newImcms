(function ( Imcms ) {
  Imcms.ImageEditor = {
    init: function () {
      $( "#showHideRightPanel" ).click( Imcms.ImageEditor.showHideRightPanel );
      $( "#showHideBottomPanel" ).click( Imcms.ImageEditor.showHideBottomPanel );
      $( "#chooseMode" ).click( Imcms.ImageEditor.chooseMode );
    },
    showHideRightPanel: function () {
      var $btn                = $( this ),
          rightSidePanel      = $( "#rightSidePanel" ),
          rightSidePanelWidth = rightSidePanel.width()
      ;

      if ( $btn.data( "state" ) ) {
        rightSidePanel.animate( {
                                  "right": "-" + rightSidePanelWidth + "px"
                                }, 300 );
        $btn.data( "state", false );
        $btn.text( "show right panel" );
      } else {
        rightSidePanel.animate( {
                                  "right": 0
                                }, 300 );
        $btn.data( "state", true );
        $btn.text( "hide right panel" );
      }
    },
    showHideBottomPanel: function () {
      var $btn                  = $( this ),
          bottomPanel           = $( "#bottomPanel" ),
          bottomSidePanelHeight = bottomPanel.height()
      ;

      if ( $btn.data( "state" ) ) {
        bottomPanel.animate( {
                               "bottom": "-" + bottomSidePanelHeight + "px"
                             }, 300 );
        $btn.data( "state", false );
        $btn.text( "show bottom panel" );
      } else {
        bottomPanel.animate( {
                               "bottom": 0
                             }, 300 );
        $btn.data( "state", true );
        $btn.text( "hide bottom panel" );
      }
    },
    chooseMode: function () {
      var $btn                = $( this ),
          advancedOptionPanel = $( ".imcms-advanced-mode" )
      ;

      if ( $btn.data( "state" ) ) {
        advancedOptionPanel.hide();
        $btn.data( "state", false );
        $btn.text( "advanced" );
      } else {
        advancedOptionPanel.show();
        $btn.data( "state", true );
        $btn.text( "simple" );
      }
    }
  };

  return Imcms.ImageEditor;
})( Imcms );