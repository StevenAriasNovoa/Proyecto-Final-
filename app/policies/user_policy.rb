class UserPolicy < ApplicationPolicy
    attr_reader :user, :record

    def initialize(user, record)
        @user = user
        @record = record
    end

    def update?
        # Lógica para determinar si el usuario puede actualizar el registro
        user.admin? || user == record
    end
end
