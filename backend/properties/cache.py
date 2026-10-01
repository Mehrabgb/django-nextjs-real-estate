from django.core.cache import cache

PROPERTY_CACHE_VERSION_KEY = "properties:cache_version"


def get_property_cache_version():
    version = cache.get(PROPERTY_CACHE_VERSION_KEY)

    if version is None:
        version = 1
        cache.set(PROPERTY_CACHE_VERSION_KEY, version, timeout=None)

    return version

def invalidate_property_cache():
    version = get_property_cache_version()
    cache.set(
        PROPERTY_CACHE_VERSION_KEY,
        version + 1,
        timeout=None
    )

def invalidate_property_detail(property_id):
    cache.delete(f"property:{property_id}")
