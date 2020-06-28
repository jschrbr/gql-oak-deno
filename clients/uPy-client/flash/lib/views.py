from m5stack import lcd, buttonB
import api

partName = '912-A2 M3x50'


def load_screen():
    lcd.clear()
    lcd.font(lcd.FONT_Ubuntu)
    lcd.text(lcd.CENTER, lcd.CENTER, "Loading...")
    lcd.font(lcd.FONT_Default)


def get_partBtn():
    load_screen()
    part = api.getPart(partName)
    part = part['data']['getPart']
    lcd.clear()
    partCount = part['quantity']
    message = "{}-off {}".format(part['quantity'], part['name'])
    lcd.text(lcd.CENTER, lcd.CENTER, message)
    lcd.text(lcd.CENTER, lcd.BOTTOM, "Hold to refresh")
    return part['id']


buttonB.releasedFor(1.5, get_partBtn)
