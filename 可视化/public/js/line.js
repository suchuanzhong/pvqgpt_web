var LineChart = function( options ) {

    var data = options.data;
    var canvas = document.getElementById(options.id);
    var context = canvas.getContext( '2d' );
    var rendering = false,
        paddingX = 0,
        paddingY = 0,
        width = canvas.width,
        height = canvas.height,
        progress = 0,
        program=null;

    var maxValue,
        minValue;

    var y1 = paddingY + ( 0.05 * ( height - ( paddingY * 2 ) ) ),
        y2 = paddingY + ( 0.50 * ( height - ( paddingY * 2 ) ) ),
        y3 = paddingY + ( 0.95 * ( height - ( paddingY * 2 ) ) );

    format();
    //render();

    function format( force ) {

        maxValue = 0;
        minValue = Number.MAX_VALUE;
        let point=null;
        for(var i=0;i<data.length;i++){
            point=data[i];
            maxValue = Math.max( maxValue, point.value );
            minValue = Math.min( minValue, point.value );
        }
        for(var i=0;i<data.length;i++){
            point=data[i];
            point.targetX = paddingX + ( i / ( data.length - 1 ) ) * ( width - ( paddingX * 2 ) );
            point.targetY = paddingY + ( ( point.value - minValue ) / ( maxValue - minValue ) * ( height - ( paddingY * 2 ) ) );
            point.targetY = height - point.targetY;
            if( force || ( !point.x && !point.y ) ) {
                point.x = point.targetX+30;
                point.y = point.targetY;
                point.speed = 0.04 + ( 1 - ( i / data.length ) ) * 0.08;
            }
        }


    }

    function render() {

        if( !rendering||progress>=0.99) {
            if(program)
                cancelAnimationFrame(program);
            options.stopcallback();
            return;
        }

        context.clearRect( 0, 0, width, height );



        var progressDots = Math.floor( progress * data.length );
        var progressFragment = ( progress * data.length ) - Math.floor( progress * data.length );



        context.save();
        context.beginPath();
        context.strokeStyle = '#1baee1';
        context.lineWidth = 5;

        var futureStarted = false;
        var point=null;
        for(var i=0;i<data.length;i++){
            point=data[i];
            if( i <= progressDots ) {

                var px = i === 0 ? data[0].x : data[i-1].x,
                    py = i === 0 ? data[0].y : data[i-1].y;

                var x = point.x,
                    y = point.y;

                if( i === progressDots ) {
                    x = px + ( ( x - px ) * progressFragment );
                    y = py + ( ( y - py ) * progressFragment );
                }

                if( point.future && !futureStarted ) {
                    futureStarted = true;

                    context.stroke();
                    context.beginPath();
                    context.moveTo( px, py );
                    context.strokeStyle = '#aaa';

                    if( typeof context.setLineDash === 'function' ) {
                        context.setLineDash( [2,3] );
                    }
                }

                if( i === 0 ) {
                    context.moveTo( x, y );
                }
                else {
                    context.lineTo( x, y );
                }

            }
        }

        context.stroke();
        context.restore();
        progress += ( 1 - progress ) * 0.2;
        program=requestAnimationFrame( render );

    }

    this.start = function() {
        rendering = true;
        render();
    };

    this.stop = function() {
        rendering = false;
        progress = 0;
        format( true );
       
    }

    this.restart = function() {
        this.stop();
        this.start();
    }

    this.append = function( points ) {
        progress -= points.length / data.length;
        data = data.concat( points );

        format();
    }

    this.populate = function( points ) {
        progress = 0;
        data = points;

        format();
    }

};
