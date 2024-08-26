from pghbustime import *

class Transport:

    def __init__(self):
        my_key = "EhKigaWxEUwdQarQB48BLsqWb"

        self.api = BustimeAPI(my_key)

    def adjust_hour(self, hr):
        if isinstance(hr, str):
            hr = int(hr)
        if hr == 12:
            return 12
        return hr % 12

    def get_prediction(self, stop):
        pred = self.api.predictions(stpid=stop, maxpredictions=1)['prd']
        bus_route = pred['rt']
        time = pred['prdtm']
        year = time[:4]
        month = time[4:6]
        day = time[6:8]
        hour = time[9:11]
        minute = time[12:14]
        second = time[15:17]
        meridiem = 'pm' if int(hour) > 11 else 'am'
        return {'time': (f"{month}-{day}-{year}"
                         f" {self.adjust_hour(hour)}:{minute}:{second} {meridiem}"),
                'bus': (f"{bus_route}")}
    

if __name__ == '__main__':
    # For debugging
    bus = Transport()
    print(bus.get_prediction(7097))
