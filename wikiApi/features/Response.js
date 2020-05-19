class Response {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }

  static fromObject(payload) {
    return new Response('valid', payload);
  }

  static fromErr(payload) {
    return new Response('err', payload);
  }

  toObject() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

module.exports = Response;
