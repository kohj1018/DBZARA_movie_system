class MovieExistException(Exception):
    def __init__(self):
        super().__init__('이미 존재하는 영화입니다.')


class RunningTimeException(Exception):
    def __init__(self):
        super().__init__('런닝타임이 존재하지 않습니다.')
