SECRET_KEY = 'django-insecure-6m-bh8$p%lwcbdjlw^tls9im6ae(44a0+hc!cp&&qcdw^-wk%j'

DATABASES = {
    'default': {
        'ENGINE': 'psqlextra.backend',
        'NAME': 'movie',
        'USER': 'dbzara',
        'PASSWORD': 'zara123!',
        'HOST': 'movie-database.postgres.database.azure.com',
        'PORT': '5432',
    }
}

KOBIS_SECRET_KEY = '006095c1ed8a1f88a0292f8aa6b578c6'
TMDB_SECRET_KEY = '2a8bcd9a7610b880c47734f46a4b2cd5'
NAVER_API = 'lpdzkpp9m5'
NAVER_SECRET_KEY = 'g7rZK2DodkW70anirVLOgYKCxjnDTYhRfb4Zm2BZ'
