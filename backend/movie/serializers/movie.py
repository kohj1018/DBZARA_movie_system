from movie.serializers.base import *


class BoxOfficeMovieSerializer(MovieSerializer):
    class Meta(MovieSerializer.Meta):
        fields = ['name', 'poster', 'backdrop', 'reservation_rate']


class NotOpenMovieSerializer(MovieSerializer):
    class Meta(MovieSerializer.Meta):
        fields = ['name', 'poster', 'backdrop', 'opening_date']


class ReservationBaseMovieSerializer(MovieSerializer):
    class Meta(MovieSerializer.Meta):
        fields = ['name', 'age']


class ReservationChoiceMovieSerializer(ReservationBaseMovieSerializer):
    class Meta(ReservationBaseMovieSerializer.Meta):
        pass


class MovieRankSerializer(MovieSerializer):
    # TODO: 예약 인원을 파악할 수 있는 모델 제작 이후 rank 추가
    # rank = serializers.FloatField(source='get_reservation_percent')
    class Meta:
        fields = ['id', 'name', 'images']


class MovieDetailSerializer(MovieSerializer):
    genres = GenreSerializer(many=True)
    characters = CharacterSerializer(source='character_set', many=True)
    directors = DirectorSerializer(many=True)
    distributors = DistributorSerializer(many=True)

    class Meta:
        model = Movie
        fields = ['name', 'running_time', 'summary', 'opening_date',
                  'genres', 'characters', 'directors', 'distributors', 'images']
