module.exports = (table) => {
    table.string('title', 255);
    table.text('context', 16383);
    table.increments();
    table.timestamp('updatedAt');

    return table;
};
