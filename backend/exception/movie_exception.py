class MovieExistException(Exception):
    def __init__(self):
        super().__init__('이미 존재하는 영화입니다.')
