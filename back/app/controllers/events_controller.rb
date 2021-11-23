class EventsController < ApplicationController
  def index
    # イベントデータの一覧を返す
    render json: Event.all
  end
end
