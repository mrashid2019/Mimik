def construct_element(element:str, inner_html=None)->str:
    """Construct an HTML element using formatted string

    Args:
        element (str): The name of the element tag
        innerHTML (str, optional): Whatever the element tag may contain

    Returns:
        _type_: _description_
    """
    return f"<{element}>{inner_html if inner_html is not None else 'None'}<{element}>"