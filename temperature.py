# Only works on RPI 4
# Most of the code is paraphrased from 
# https://learn.sparkfun.com/tutorials/python-programming-tutorial-getting-started-with-the-raspberry-pi/experiment-4-i2c-temperature-sensor
try:
    import smbus
    tempAvailable = True
except ImportError:
    tempAvailable = False
    print("Note temperature can not be displayed on this device.")

def twos_comp(val, bits):
    if (val & (1 << (bits - 1))) != 0:
        val = val - (1 << bits)
    return val

def convert_to_F(c):
    return (c * (9/5)) + 32

class Temperature:
    def __init__(self):
        i2c_ch = 1

        self.tmp_address = 0x48

        self.reg_temp = 0x00
        self.reg_config = 0x01

        self.bus = smbus.SMBus(i2c_ch)

        self.val = self.bus.read_i2c_block_data(self.tmp_address, self.reg_config, 2)

        self.val[1] = self.val[1] & 0b00111111
        self.val[1] = self.val[1]  | (0b10 << 6)

        self.bus.write_i2c_block_data(self.tmp_address, self.reg_config, self.val)

    def read_temp(self):
        self.val = self.bus.read_i2c_block_data(self.tmp_address, self.reg_temp, 2)

        temp_c = (self.val[0] << 4) | (self.val[1] >> 4)
        temp_c = twos_comp(temp_c, 12)
        temp_c = temp_c * 0.0625

        return convert_to_F(temp_c)
