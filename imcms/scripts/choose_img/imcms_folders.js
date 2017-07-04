(function ( Imcms ) {
  var viewModel;

  /*response from server*/
  function getFoldersUrl() {
    return Imcms.REST.read();
  }

  /*create foldersObject function*/
  function findFoldersRootUrl( urlsArray ) {
    var length = urlsArray[ 0 ].length, index = 0;
    urlsArray.forEach( function ( url ) {
      if ( url.length < length ) {
        length = url.length;
        index = urlsArray.indexOf( url )
      }
    } );

    return urlsArray[ index ];
  }

  function getRelativeFoldersUrl( foldersUrlArray, root ) {
    var relativeFoldersUrlArray = [];

    foldersUrlArray.forEach( function ( url ) {
      relativeFoldersUrlArray.push( url.substring( root.length ) );
    } );

    relativeFoldersUrlArray.forEach( function ( relativeUrl ) {
      if ( relativeUrl.length === 0 ) {
        relativeFoldersUrlArray.splice( relativeFoldersUrlArray.indexOf( relativeUrl ), 1 );
      }
    } );

    return relativeFoldersUrlArray;
  }

  function parseFoldersUrl() {
    var foldersUrlArray          = getFoldersUrl(),
        root                     = findFoldersRootUrl( foldersUrlArray ),
        foldersRelativeUrlsArray
    ;

    foldersRelativeUrlsArray = getRelativeFoldersUrl( foldersUrlArray, root );

    return foldersRelativeUrlsArray.map( function ( relUrl ) {
      relUrl = relUrl.split( "/" );
      relUrl.splice( 0, 1 );
      return relUrl;
    } );

  }

  function getFoldersObject() {
    return parseFoldersUrl().map( function ( url ) {
      return {
        name: url[ url.length - 1 ],
        parent: url.slice( 0, url.length - 1 ).join( "/" ),
        path: url.join( "/" ),
        level: url.length,
        subfolder: []
      }
    } ).sort( function ( a, b ) {
      return b.level - a.level;
    } );
  }

  function getFolders() {
    var foldersArray = getFoldersObject(),
        pathToFolder = {}
    ;

    foldersArray.forEach( function ( folder ) {
      if ( pathToFolder[ folder.parent ] ) {
        pathToFolder[ folder.parent ].push( folder );
      } else {
        pathToFolder[ folder.parent ] = [ folder ];
      }

      if ( pathToFolder[ folder.path ] ) {
        folder.subfolder = pathToFolder[ folder.path ];
        delete pathToFolder[ folder.path ];
      }
    } );

    pathToFolder = pathToFolder[ "" ];

    return pathToFolder;
  }

  /*builderFolder functions*/
  function createFolderWrap( level ) {
    return $( "<div>", {
      "class": (level === 1) ? "imcms-left-side__folders imcms-folders" : "imcms-folders",
      "data-folders-lvl": level
    } )
  }

  function createControl( controls ) {
    viewModel.controls.forEach( function ( control ) {
      $( "<div>", {
        "class": "imcms-controls__control imcms-control imcms-control--" + control.name,
        click: control.click
      } ).prependTo( controls );
    } );

    return controls;
  }

  function createControls() {
    var controls = $( "<div>", {
      "class": "imcms-folder__controls"
    } );

    return createControl( controls );
  }

  function createFolderName( name ) {
    return $( "<div>", {
      "class": "imcms-folder__name imcms-title",
      text: name,
      click: Imcms.Folders.active
    } )
  }

  function createShowHideBtn( isSubfolder ) {
    if ( isSubfolder.length !== 0 ) {
      return $( "<div>", {
        "class": "imcms-folder__btn",
        click: Imcms.Folders.showHideSubfolders
      } )
    }
  }

  function createFolder( folder ) {
    var newFolder;

    newFolder = $( "<div>", {
      "class": "imcms-folders__folder imcms-folder",
      "data-folder-path": folder.path
    } ).prepend( createControls() );
    newFolder.prepend( createFolderName( folder.name ) );
    if ( folder.subfolder.length !== 0 ) {
      newFolder.prepend( createShowHideBtn( folder.subfolder ) );
    }

    return newFolder;
  }

  function buildSubfolder( subfolders, wrap ) {
    subfolders.forEach( function ( subfolder ) {
      wrap.prepend( buildFolderWrap( subfolder ) );
    } )
  }

  function buildFolder( folder, wrap ) {
    if ( folder.subfolder.length !== 0 ) {
      return createFolder( folder ).prepend( buildSubfolder( folder.subfolder, wrap ) )
    } else {
      return createFolder( folder );
    }
  }

  function buildFolderWrap( folder ) {
    var wrap = createFolderWrap( folder.level );
    return wrap.prepend( buildFolder( folder, wrap ) );
  }

  function folderBuilder( folders ) {
    folders.forEach( function ( folder ) {
      $( document ).find( ".imcms-content-manager__left-side" ).append( buildFolderWrap( folder ) );
    } )
  }

  /*find and delete element in viewModel.folders array */
  function findAndDeleteFolderInArray( elementPath, arrayOfFolders ) {

    arrayOfFolders.forEach( function ( folder ) {
      if ( folder.path === elementPath ) {
        arrayOfFolders.splice( arrayOfFolders.indexOf( folder ), 1 );
      }
      if ( folder.subfolder.length !== 0 ) {
        findAndDeleteFolderInArray( elementPath, folder.subfolder );
      }
    } );
  }

  /*action function (remove, rename, move, create)*/
  function removeFolderFromServer( folderId ) {
    var urlsArray      = getFoldersUrl(),
        folderFullPath = findFoldersRootUrl( urlsArray ) + "/" + folderId
    ;

    findAndDeleteFolderInArray( folderId, viewModel.folders );
    Imcms.REST.remove( folderFullPath );
  }

  function renameFolderOnServer( folder ) {
    var folderPathArray       = folder.attr( "data-folder-path" ).split( "/" ),
        newFolderRelativePath,
        urlsArray             = getFoldersUrl(),
        folderFullPath        = findFoldersRootUrl( urlsArray )
    ;

    folderPathArray[ folderPathArray.length - 1 ] = folder.find( ".imcms-folder__name" ).text();
    newFolderRelativePath = folderPathArray.join( "/" );
    folderFullPath = folderFullPath + "/" + newFolderRelativePath;
    folder.attr( "data-folder-path", newFolderRelativePath );

    Imcms.REST.update( folderFullPath );
  }

  function createFolderOnServer( folder ) {
    var urlsArray      = getFoldersUrl(),
        folderFullPath = findFoldersRootUrl( urlsArray ) + "/" + folder.path
    ;

    Imcms.REST.create( folderFullPath );
  }

  Imcms.Folders = {
    init: function () {

      viewModel = {
        foldersArea: $( document ).find( ".imcms-content-manager__left-side" ),
        folders: getFolders(),
        controls: [
          {
            name: "create",
            click: Imcms.Folders.createNewFolder
          },
          {
            name: "rename",
            click: Imcms.Folders.renameFolder
          },
          {
            name: "remove",
            click: Imcms.Folders.removeFolder
          },
          {
            name: "move",
            click: Imcms.Folders.moveFolder
          }
        ]
      };

      folderBuilder( viewModel.folders );

      $( ".imcms-main-folders-controls .imcms-control--create" ).click( Imcms.Folders.createNewFirstLevelFolder );

      $( function () {
        var allFoldersSection = $( ".imcms-content-manager__left-side" ),
            allSubfolders     = allFoldersSection
                .find( ".imcms-folders" )
        ;

        allSubfolders.each( function () {
          if ( $( this ).attr( "data-folders-lvl" ) !== "1" ) {
            $( this ).addClass( "imcms-subfolders--close" );
          }
        } );

      } );
    },
    active: function () {
      var allFolders = $( this ).parents( ".imcms-content-manager__left-side" ).find( ".imcms-folder" );

      allFolders.each( function () {
        $( this ).removeClass( "imcms-folder--active" );
      } );

      $( this ).parents( ".imcms-folder" ).addClass( "imcms-folder--active" );
    },
    showHideSubfolders: function () {
      var $btn  = $( this ),
          level = $btn.parents( ".imcms-folders" ).attr( "data-folders-lvl" )
      ;

      level = parseInt( level ) + 1;
      $btn.parents( ".imcms-folders" ).find( ".imcms-folders[data-folders-lvl=" + level + "]" ).each( function () {
        $( this ).slideToggle()
      } );
      $btn.toggleClass( "imcms-folder-btn--open" );
    },
    createNameInputPanel: function ( folder ) {
      var panel, nameInput, submitBtn, currentFolderName;

      currentFolderName = folder.find( ".imcms-folder__name" );

      panel = $( "<div>", { "class": "imcms-panel-named" } );
      nameInput = $( "<input>", {
        "class": "imcms-panel-named__input imcms-text-box__input imcms-input",
        "value": currentFolderName.text()
      } );
      submitBtn = $( "<button>", {
        "class": "imcms-panel-named__button imcms-button--neutral imcms-button",
        text: "add+"
      } );
      panel.append( nameInput );
      panel.append( submitBtn );

      return panel;

    },
    folderNameValidation: function ( path ) {
      var foldersUrlArray = getFoldersUrl(),
          root            = findFoldersRootUrl( foldersUrlArray ),
          urlsArray       = getRelativeFoldersUrl( foldersUrlArray, root ),
          response        = true
      ;

      urlsArray.forEach( function ( url ) {
        if ( url === path ) {
          response = false;
        }
      } );

      return response;
    },
    submitRename: function () {
      var $btn              = $( this ),
          panel             = $btn.closest( ".imcms-panel-named" ),
          currentFolder     = panel.prev(),
          currentFolderName = currentFolder.find( ".imcms-folder__name" ),
          newName           = panel.find( "input" ).val(),
          path
      ;

      path = currentFolder.attr( "data-folder-path" ).split( "/" );
      path[ path.length - 1 ] = newName;
      path = "/" + path.join( "/" );

      if ( Imcms.Folders.folderNameValidation( path ) ) {
        currentFolderName.text( newName );
        panel.remove();
      } else {
        panel.find( "input" ).css( { "border-color": "red" } );
      }

      currentFolder.find( ".imcms-control--rename" ).click( Imcms.Folders.renameFolder );

      renameFolderOnServer( currentFolder );
    },
    submitCreate: function () {
      var $btn           = $( this ),
          panel          = $btn.closest( ".imcms-panel-named" ),
          currentFolder  = panel.prev(),
          newName        = panel.find( "input" ).val(),
          isParentFolder = currentFolder.parent().hasClass( "imcms-folders" ),
          newFolder      = {
            level: (!isParentFolder) ? 1 : parseInt( currentFolder.parent().attr( "data-folders-lvl" ) ) + 1,
            name: newName,
            parent: (!isParentFolder) ? "" : currentFolder.attr( "data-folder-path" ),
            path: (!isParentFolder) ? newName : currentFolder.attr( "data-folder-path" ) + "/" + newName,
            subfolder: []
          }
      ;

      console.log( isParentFolder );

      var path = "/" + newFolder.path;

      if ( Imcms.Folders.folderNameValidation( path ) ) {

        if ( currentFolder.find( ".imcms-folder__btn" ).length === 0 ) {
          currentFolder.prepend( $( "<div>", {
            "class": "imcms-folder__btn imcms-folder-btn--open",
            click: Imcms.Folders.showHideSubfolders
          } ) );
        }

        if ( currentFolder.find( ".imcms-folder__btn" ).hasClass( "imcms-folder-btn--open" ) ) {
          currentFolder.after( createFolderWrap( newFolder.level ).append( createFolder( newFolder ) ) );
        } else {
          currentFolder.after( createFolderWrap( newFolder.level ).addClass( "imcms-subfolders--close" ).append( createFolder( newFolder ) ) );
        }

        panel.remove();
      } else {
        panel.find( "input" ).css( { "border-color": "red" } );
      }

      currentFolder.find( ".imcms-control--create" ).click( Imcms.Folders.createNewFolder );
      createFolderOnServer( newFolder );

    },
    renameFolder: function () {
      var $ctrl         = $( this ),
          currentFolder = $ctrl.closest( ".imcms-folder" ),
          panel         = Imcms.Folders.createNameInputPanel( currentFolder )
      ;

      panel.css( {
                   "position": "absolute",
                   "top": 0,
                   "left": 0
                 } );

      panel.find( "button" ).click( Imcms.Folders.submitRename );

      currentFolder.after( panel );

      currentFolder.find( ".imcms-control--rename" ).unbind( "click" );
    },
    removeFolder: function () {
      var $ctrl             = $( this ),
          currentFolder     = $ctrl.closest( ".imcms-folder" ),
          subFolders        = currentFolder.parent().find( ".imcms-folders" ),
          parentFolder      = currentFolder.closest( ".imcms-folders" ),
          currentFolderWrap = parentFolder.parent(),
          currentFolderId   = currentFolder.attr( "data-folder-path" )
      ;

      subFolders.remove();
      currentFolder.remove();
      parentFolder.remove();

      if ( currentFolderWrap.children().length === 1 ) {
        currentFolderWrap.find( ".imcms-folder__btn" ).remove();
      }

      removeFolderFromServer( currentFolderId );
    },
    moveFolder: function () {

    },
    createNewFolder: function () {
      var $ctrl         = $( this ),
          currentFolder = $ctrl.closest( ".imcms-folder" ),
          panel         = Imcms.Folders.createNameInputPanel( currentFolder )
      ;

      panel.css( {
                   "position": "relative"
                 } );

      panel.find( "button" ).click( Imcms.Folders.submitCreate );

      currentFolder.after( panel );

      currentFolder.find( ".imcms-control--create" ).unbind( "click" );
    },
    createNewFirstLevelFolder: function () {
      var $ctrl         = $( this ),
          currentFolder = $ctrl.closest( ".imcms-main-folders-controls" ),
          panel         = Imcms.Folders.createNameInputPanel( currentFolder )
      ;

      panel.css( {
                   "position": "relative"
                 } );

      panel.find( "button" ).click( Imcms.Folders.submitCreate );

      currentFolder.after( panel );

      currentFolder.find( ".imcms-control--create" ).unbind( "click" );
    }

  };

  return Imcms.Folders;
})( Imcms );