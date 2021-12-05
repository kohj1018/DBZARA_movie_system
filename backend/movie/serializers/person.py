from movie.serializers.base import ActorSerializer, DirectorSerializer, MovieSerializer


class ActorDetailSerializer(ActorSerializer):
    filmography = MovieSerializer(many=True)

    class Meta(ActorSerializer.Meta):
        fields = ActorSerializer.Meta.fields + ['filmography']


class DirectorDetailSerializer(DirectorSerializer):
    filmography = MovieSerializer(many=True)

    class Meta(DirectorSerializer.Meta):
        fields = DirectorSerializer.Meta.fields + ['filmography']
