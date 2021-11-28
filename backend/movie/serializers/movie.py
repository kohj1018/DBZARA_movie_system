from movie.serializers.base import *


class MovieRankSerializer(MovieSerializer):
    # TODO: 예약 인원을 파악할 수 있는 모델 제작 이후 rank 추가
    # rank = serializers.FloatField(source='get_reservation_percent')
    class Meta:
        model = Movie
        fields = ['id', 'name', 'images']


class MovieDetailSerializer(MovieSerializer):
    genres = GenreSerializer(many=True)
    characters = CharacterSerializer(source='character_set', many=True)
    directors = DirectorSerializer(many=True)
    distributors = DistributorSerializer(many=True)

    class Meta:
        model = Movie
        fields = ['genres', 'running_time', 'summary', 'characters', 'directors', 'distributors', 'images', 'opening_date', 'name']
