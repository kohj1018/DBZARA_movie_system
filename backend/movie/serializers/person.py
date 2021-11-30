from movie.serializers.base import ActorSerializer, DirectorSerializer, MovieSerializer


class ActorDetailSerializer(ActorSerializer):
    filmography = MovieSerializer(many=True)

    class Meta:
        fields = ['name', 'image', 'birth_date', 'filmography']


class DirectorDetailSerializer(DirectorSerializer):
    filmography = MovieSerializer(many=True)

    class Meta:
        fields = ['name', 'image', 'birth_date', 'filmography']
