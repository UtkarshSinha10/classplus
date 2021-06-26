import { Component } from 'react';
import SearchBox from './components/searchbox';
import PhotoList from './components/photoList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchList: [],
      photoList: []
    }
    this.onSerachBarChange = this.onSerachBarChange.bind(this);
    this.api1Call = this.api1Call.bind(this);
    this.api2Call = this.api2Call.bind(this);
    this.onScrollAPIHit = this.onScrollAPIHit.bind(this);
  }

  async api1Call(page, endReached = false) {
    const api1 = 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=482727d1943be8e9d7ce72873bc6a2c2&page=' + page + '&format=json&nojsoncallback=1';
    fetch(api1)
      .then(res => {
        return res.json();
      })
      .then(item => {
        const recentPhotos = item.photos.photo.map(x => {
          return {
            farm: x.farm,
            server: x.server,
            id: x.id,
            secret: x.secret
          }
        });
        if (!endReached) this.setState({ photoList: recentPhotos });
        else this.state.photoList.push(recentPhotos);
      })
      .catch(err => {
        console.log(err);
      })
  }

  async api2Call(query, page, endReached = false) {
    await this.setState({ searchValue: query.trim() }, () => console.log('Search box changed'));
    const api2 = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=482727d1943be8e9d7ce72873bc6a2c2&text=' + this.state.searchValue + '&page=' + page + '&format=json&nojsoncallback=1';
    fetch(api2)
      .then(res => {
        return res.json();
      })
      .then(item => {
        const recentPhotos = item.photos.photo.map(x => {
          return {
            farm: x.farm,
            server: x.server,
            id: x.id,
            secret: x.secret
          }
        });
        if (!endReached) this.setState({ photoList: recentPhotos });
        else this.state.photoList.push(recentPhotos);
      })
      .catch(err => {
        console.log(err);
      });
    this.state.searchList.push(this.state.searchValue);
  }

  componentDidMount() {
    const page = Math.floor(Math.random()) * 10;
    this.api1Call(page);
  }

  async onSerachBarChange(event) {
    const query = event.target.value;
    const page = Math.floor(Math.random()) * 10;
    if (query && query.trim() && query.length > 0) {
      this.api2Call(query, page);
    } else {
      this.api1Call(page)
    }
  }

  async onScrollAPIHit() {
    console.log('touched')
    const query = this.state.searchValue;
    const page = Math.floor(Math.random()) * 10;
    if (query && query.trim() && query.length > 0) {
      console.log(1);
      this.api2Call(query, page, true);
    } else {
      console.log(2);
      this.api1Call(page, true)
    }
  }
  render() {
    return (
      <div onWheel={this.onScrollAPIHit}>
        <SearchBox onSearchChange={this.onSerachBarChange} suggestions={this.state.searchList} />
        <PhotoList photoList={this.state.photoList} />
      </div >
    );
  }
}

export default App;