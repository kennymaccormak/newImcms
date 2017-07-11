(function ( Imcms ) {
  Imcms.MenuEditor = {
    init: function () {
      $(".imcms-menu-item__btn").click(Imcms.MenuEditor.showHideSubmenu);
    },
    showHideSubmenu: function () {
      var $btn  = $( this ),
          level = $btn.parents( ".imcms-menu-items" ).attr( "data-menu-items-lvl" )
      ;

      level = parseInt( level ) + 1;
      $btn.parents( ".imcms-menu-items" )
          .find( ".imcms-menu-items[data-menu-items-lvl=" + level + "]" )
          .each( function () {
            $( this ).slideToggle()
          } );
      $btn.toggleClass( "imcms-menu-item-btn--open" );
    }
  };

  return Imcms.MenuEditor;
})(Imcms);
