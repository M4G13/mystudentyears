module.exports = {
  beforeCreate(event) {
    event.params.data.UUID = crypto.randomUUID();
  }
};
