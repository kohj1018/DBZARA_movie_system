class SeatExistException(Exception):
    def __init__(self):
        super().__init__('이미 존재하는 좌석입니다.')
