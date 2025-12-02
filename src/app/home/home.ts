import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import {HousingService} from '../housing';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  readonly heroPhoto = '/organic.webp';
  readonly heroPhotos = '/img13.jpg';

  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];

  constructor(
    private housingService: HousingService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    const query = text.toLowerCase();
    this.filteredLocationList = this.housingLocationList.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.colorway.toLowerCase().includes(query)
    );
  }

  scrollToListings() {
    const section = this.document?.getElementById('listings');
    section?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
