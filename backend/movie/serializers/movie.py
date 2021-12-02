from movie.serializers.base import *


class MovieListSerializer(MovieSerializer):
    class Meta(MovieSerializer.Meta):
        fields = ['name', 'poster', 'backdrop', 'reservation_rate']


class ReservationBaseMovieSerializer(MovieSerializer):
    class Meta(MovieSerializer.Meta):
        fields = ['name', 'age']


class ReservationChoiceMovieSerializer(ReservationBaseMovieSerializer):
    class Meta(ReservationBaseMovieSerializer.Meta):
        pass


class MovieRankSerializer(MovieSerializer):
    # TODO: 예약 인원을 파악할 수 있는 모델 제작 이후 rank 추가
    class Meta:
        model = Movie
        fields = ['id', 'name', 'images']


class MovieDetailSerializer(MovieSerializer):
    genres = GenreSerializer(many=True)
    distributors = DistributorSerializer(many=True)

    class Meta:
        model = Movie
        fields = ['name', 'running_time', 'summary', 'opening_date',
                  'genres', 'distributors', 'poster', 'backdrop', 'watch_grade']


class MovieStaffSerializer(MovieSerializer):
    characters = CharacterSerializer(source='character_set', many=True)
    directors = DirectorSerializer(many=True)

    class Meta(MovieSerializer.Meta):
        fields = ['characters', 'directors']


class MovieImageSerializer(MovieSerializer):
    images = ImageSerializer(many=True)

    class Meta(MovieSerializer.Meta):
        fields = ['images']


class MovieVideoSerializer(MovieSerializer):
    videos = VideoSerializer(many=True)

    class Meta(MovieSerializer.Meta):
        fields = ['videos']


class MovieReviewSerializer(MovieSerializer):
    reviews = ReviewSerializer(source='review_set', many=True)

    class Meta(MovieSerializer.Meta):
        fields = ['reviews']
