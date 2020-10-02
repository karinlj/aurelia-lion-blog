import moment from "moment";
export class DateFormatValueConverter {
  //dateFormat
  toView(value) {
    //taking in a value from our format-converter
    return moment(value).format("MMM Do YYYY, h:mm a");
  }

  fromView(value) {}
}
