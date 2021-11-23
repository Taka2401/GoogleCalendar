class EventsController < ApplicationController

  def index
    # イベントデータの一覧を返す
    render json: Event.all
  end

  def show
    # 指定したidのイベントデータを返す
    render json: Event.find(params[:id])
  end
end
