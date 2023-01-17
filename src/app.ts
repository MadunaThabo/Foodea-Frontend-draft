console.log("The app works");

import { Model } from 'backbone';

class MyModel extends Model {
  url: any = 'https://localhost:7008/api/users/random';

  fetchData() {
    this.fetch({
      dataType: 'json'
    }).then(() => {
      console.log(this.toJSON());
    });
  }
}

const myModel = new MyModel();
myModel.fetchData();

