module.exports={
    select: function(selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    },

    ifIn: function( value, array, options ){
        if (array.indexOf(value) > -1) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}