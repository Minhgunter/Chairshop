module.exports={
    select: function(selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    },

    ifIn: function(_id, collection, options) {
       if (collection.indexOf(_id)>-1){
        return options.fn(this);
       }

       return options.inverse(this);
    }
}
