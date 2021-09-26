from rest_framework.permissions import BasePermission

class IsModeratorPermission(BasePermission):
    message = 'Você precisa ser moderador para executar essa ação'

    def has_permission(self, request, view):
        return request.user.person.is_moderator

    def has_object_permission(self, request, view, obj):
        return request.user.person.is_moderator
