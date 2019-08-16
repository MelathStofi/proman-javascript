import persistence
import connection


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


@connection.connection_handler
def get_boards(cursor):
    query = """
        SELECT * FROM boards
        """
    cursor.execute(query)
    return cursor.fetchall()


@connection.connection_handler
def get_statuses(cursor):
    query = """
        SELECT * FROM boards
        """

    cursor.execute(query)
    return cursor.fetchall()


@connection.connection_handler
def save_board_title(cursor, board_title):
    query = """
        INSERT INTO boards(title) VALUES (%(board_title)s);
        """
    parameter = {"board_title": board_title}
    cursor.execute(query, parameter)


@connection.connection_handler
def get_cards_for_board(cursor, board_id):
    query = """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s 
        """
    parameter = {'board_id': board_id}
    cursor.execute(query, parameter)

    return cursor.fetchall()
