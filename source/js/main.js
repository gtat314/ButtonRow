/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @iconUniformNames
 * @objectifyEventListeners
 * @documentationApi
 * @distinctEventListeners
 * @minimizeProperties
 * @parentElementSelector
 * @propertiesElemUnderscore
 * @propertify
 * @methodNamingConventions
 * @propertyNamingConventions
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {HTMLSourceElement}        schema.title
 * @param {Object}                  [schema.dataAttrs]
 * @param {HTMLSourceElement}       [schema.subtitle]
 * @param {URL}                     [schema.href]
 * @param {String}                  [schema.target]
 * @param {SVGElement}              [schema.imageDefault]
 * @param {SVGElement}              [schema.iconDefault]
 * @param {SVGElement}              [schema.iconLoading]
 * @param {SVGElement}              [schema.iconSuccess]
 * @param {SVGElement}              [schema.iconWarning]
 * @param {Function}                [schema.onClick]
 * @param {Object[]}                [schema.eventListeners]
 * @param {String}                   schema.eventListeners[].type
 * @param {Function}                 schema.eventListeners[].listener
 */
function ButtonRow( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._schema = schema;

    /**
     * 
     * @property
     */
    this.parentElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._titleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._iconElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._subtitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._onClickCallback = null;




    if ( typeof this._schema.parent === 'object' ) {

        this.parentElem = this._schema.parent;

    } else if ( typeof this._schema.parent === 'string' ) {

        this.parentElem = document.querySelector( this._schema.parent );

    }

    var fragment = document.createDocumentFragment();

    var textElem = document.createElement( 'DIV' );
    textElem.classList.add( 'text' );
    fragment.appendChild( textElem );

    this._titleElem = document.createElement( 'P' );
    this._titleElem.classList.add( 'title' );
    this._titleElem.innerHTML = this._schema.title;
    textElem.appendChild( this._titleElem );

    if ( this._schema.hasOwnProperty( 'dataAttrs' ) ) {

        for ( var attr in this._schema.dataAttrs ) {

            this.parentElem.setAttribute( 'data-' + attr, this._schema.dataAttrs[ attr ] );

        }

    }

    if ( this._schema.hasOwnProperty( 'subtitle' ) ) {

        this._subtitleElem = document.createElement( 'SAMP' );
        this._subtitleElem.classList.add( 'subtitle' );
        this._subtitleElem.innerHTML = this._schema.subtitle;
        textElem.appendChild( this._subtitleElem );

    }

    if ( this._schema.hasOwnProperty( 'imageDefault' ) ) {

        this.imageWrapElem = document.createElement( 'DIV' );
        this.imageWrapElem.classList.add( 'imageWrap' );
        fragment.appendChild( this.imageWrapElem );

        var imageDefaultElem = document.createElement( 'SPAN' );
        imageDefaultElem.innerHTML = this._schema.imageDefault;
        this.imageWrapElem.appendChild( imageDefaultElem );

    }

    if ( this._schema.hasOwnProperty( 'iconDefault' ) ) {

        this._iconElem = document.createElement( 'SPAN' );
        this._iconElem.classList.add( 'icon' );
        this._iconElem.innerHTML = this._schema.iconDefault;
        fragment.appendChild( this._iconElem );

    }

    if ( this._schema.hasOwnProperty( 'eventListeners' ) ) {

        for ( var i = 0 ; i < this._schema.eventListeners.length ; i++ ) {

            if ( this._schema.eventListeners[ i ].type === 'click' ) {

                this._onClickCallback = this._schema.eventListeners[ i ].listener;

            }

        }

    }

    if ( this._schema.hasOwnProperty( 'onClick' ) ) {

        this._onClickCallback = this._schema.onClick;

    }

    this.parentElem.addEventListener( 'click', this._evt_click_parentElem.bind( this ) );
    this.parentElem.appendChild( fragment );

};

/**
 * 
 * @param {SVGElement} iconHtml
 */
ButtonRow.prototype.setIcon = function( iconHtml ) {

    this._iconElem.innerHTML = iconHtml;

}

/**
 * 
 * @param {URL} url 
 */
ButtonRow.prototype.setImage = function( url ) {

    this.deleteImage();

    var image = new Image();
    image.src = url;
    this.imageWrapElem.appendChild( image );

};

/**
 * 
 */
ButtonRow.prototype.deleteImage = function() {

    if ( this.imageWrapElem.querySelector( 'img' ) ) {

        this.imageWrapElem.removeChild( this.imageWrapElem.querySelector( 'img' ) );

    }

};

/**
 * 
 */
ButtonRow.prototype.reset = function() {

    this._iconElem.innerHTML = this._schema.iconDefault;

};

/**
 * 
 */
ButtonRow.prototype.loading = function() {

    if ( this._schema.hasOwnProperty( 'iconLoading' ) ) {

        this._iconElem.innerHTML = this._schema.iconLoading;

    }

};

/**
 * 
 */
ButtonRow.prototype.success = function() {

    if ( this._schema.hasOwnProperty( 'iconSuccess' ) ) {

        this._iconElem.innerHTML = this._schema.iconSuccess;

        setTimeout( function(){

            this._iconElem.innerHTML = this._schema.iconDefault;

        }.bind( this ), 5000 );

    }

};

/**
 * 
 * @param {String} errorMessage 
 */
ButtonRow.prototype.failure = function( errorMessage ) {

    if ( this._schema.hasOwnProperty( 'iconWarning' ) ) {

        this._iconElem.innerHTML = this._schema.iconWarning;

        setTimeout( function(){

            this._iconElem.innerHTML = this._schema.iconDefault;

        }.bind( this ), 5000 );

    }

    if ( typeof errorMessage !== 'undefined' ) {

        this._subtitleElem.innerHTML = errorMessage;

        setTimeout( function(){

            this._subtitleElem.innerHTML = this._schema.subtitle;

        }.bind( this ), 5000 );

    }

};

/**
 * 
 * @returns {Boolean}
 */
ButtonRow.prototype.activate = function() {

    if ( this.parentElem.classList.contains( 'initInactiveUnder900' ) ) {

        if ( window.innerWidth <= 900 ) {

            this.parentElem.classList.remove( 'initInactiveUnder900' );
            return false;

        }

    }

    this.parentElem.classList.add( 'active' );
    return true;

};

/**
 * 
 */
ButtonRow.prototype.deactivate = function() {

    this.parentElem.classList.remove( 'active' );

};

/**
 * 
 * @param {String} title 
 */
ButtonRow.prototype.setTitle = function( title ) {

    this._titleElem.innerHTML = title;

};

/**
 * 
 * @param {String} subtitle 
 */
ButtonRow.prototype.setSubtitle = function( subtitle ) {

    this._subtitleElem.innerHTML = subtitle;

};

/**
 * 
 * @param {String} href
 */
ButtonRow.prototype.setHref = function ( href ) {

    this._schema.href = href;

};

/**
 * 
 * @param {String} target
 */
ButtonRow.prototype.setTarget = function ( target ) {

    this._schema.target = target;

};

/**
 * 
 * @param {String} className
 */
ButtonRow.prototype.addClass = function( className ) {

    if ( this.parentElem.classList.contains( className ) === false ) {

        this.parentElem.classList.add( className );

    }

};

/**
 * 
 * @param {String} className
 */
ButtonRow.prototype.removeClass = function( className ) {

    this.parentElem.classList.remove( className );

};

/**
 * 
 */
ButtonRow.prototype.disable = function() {

    this.parentElem.classList.add( 'disabled' );

};

/**
 * 
 */
ButtonRow.prototype.enable = function() {

    this.parentElem.classList.remove( 'disabled' );

};




/**
 * 
 * @private
 * @param {Event} evt 
 */
ButtonRow.prototype._evt_click_parentElem = function( evt ) {

    if ( this.parentElem.classList.contains( 'disabled' ) ) {

        return false;

    }

    if ( this._schema.hasOwnProperty( 'href' ) ) {

        if ( this._schema.hasOwnProperty( 'target' ) ) {

            window.open( this._schema.href, this._schema.target );

        } else {

            window.location.href = this._schema.href;

        }

    }

    if ( this._onClickCallback !== null ) {

        this._onClickCallback( evt );

    }

};